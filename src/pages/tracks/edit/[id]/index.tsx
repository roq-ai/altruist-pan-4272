import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getTrackById, updateTrackById } from 'apiSdk/tracks';
import { Error } from 'components/error';
import { trackValidationSchema } from 'validationSchema/tracks';
import { TrackInterface } from 'interfaces/track';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { OrganizationInterface } from 'interfaces/organization';
import { getOrganizations } from 'apiSdk/organizations';

function TrackEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<TrackInterface>(
    () => (id ? `/tracks/${id}` : null),
    () => getTrackById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: TrackInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateTrackById(id, values);
      mutate(updated);
      resetForm();
      router.push('/tracks');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<TrackInterface>({
    initialValues: data,
    validationSchema: trackValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Edit Track
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <FormControl id="name" mb="4" isInvalid={!!formik.errors?.name}>
              <FormLabel>Name</FormLabel>
              <Input type="text" name="name" value={formik.values?.name} onChange={formik.handleChange} />
              {formik.errors.name && <FormErrorMessage>{formik.errors?.name}</FormErrorMessage>}
            </FormControl>
            <FormControl id="difficulty_level" mb="4" isInvalid={!!formik.errors?.difficulty_level}>
              <FormLabel>Difficulty Level</FormLabel>
              <NumberInput
                name="difficulty_level"
                value={formik.values?.difficulty_level}
                onChange={(valueString, valueNumber) =>
                  formik.setFieldValue('difficulty_level', Number.isNaN(valueNumber) ? 0 : valueNumber)
                }
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              {formik.errors.difficulty_level && <FormErrorMessage>{formik.errors?.difficulty_level}</FormErrorMessage>}
            </FormControl>
            <FormControl id="terrain" mb="4" isInvalid={!!formik.errors?.terrain}>
              <FormLabel>Terrain</FormLabel>
              <Input type="text" name="terrain" value={formik.values?.terrain} onChange={formik.handleChange} />
              {formik.errors.terrain && <FormErrorMessage>{formik.errors?.terrain}</FormErrorMessage>}
            </FormControl>
            <FormControl id="obstacles" mb="4" isInvalid={!!formik.errors?.obstacles}>
              <FormLabel>Obstacles</FormLabel>
              <Input type="text" name="obstacles" value={formik.values?.obstacles} onChange={formik.handleChange} />
              {formik.errors.obstacles && <FormErrorMessage>{formik.errors?.obstacles}</FormErrorMessage>}
            </FormControl>
            <AsyncSelect<OrganizationInterface>
              formik={formik}
              name={'organization_id'}
              label={'Select Organization'}
              placeholder={'Select Organization'}
              fetcher={getOrganizations}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.name}
                </option>
              )}
            />
            <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
              Submit
            </Button>
          </form>
        )}
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'track',
    operation: AccessOperationEnum.UPDATE,
  }),
)(TrackEditPage);
