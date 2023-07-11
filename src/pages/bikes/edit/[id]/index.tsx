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
import { getBikeById, updateBikeById } from 'apiSdk/bikes';
import { Error } from 'components/error';
import { bikeValidationSchema } from 'validationSchema/bikes';
import { BikeInterface } from 'interfaces/bike';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { OrganizationInterface } from 'interfaces/organization';
import { getOrganizations } from 'apiSdk/organizations';

function BikeEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<BikeInterface>(
    () => (id ? `/bikes/${id}` : null),
    () => getBikeById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: BikeInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateBikeById(id, values);
      mutate(updated);
      resetForm();
      router.push('/bikes');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<BikeInterface>({
    initialValues: data,
    validationSchema: bikeValidationSchema,
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
            Edit Bike
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
            <FormControl id="speed" mb="4" isInvalid={!!formik.errors?.speed}>
              <FormLabel>Speed</FormLabel>
              <NumberInput
                name="speed"
                value={formik.values?.speed}
                onChange={(valueString, valueNumber) =>
                  formik.setFieldValue('speed', Number.isNaN(valueNumber) ? 0 : valueNumber)
                }
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              {formik.errors.speed && <FormErrorMessage>{formik.errors?.speed}</FormErrorMessage>}
            </FormControl>
            <FormControl id="handling" mb="4" isInvalid={!!formik.errors?.handling}>
              <FormLabel>Handling</FormLabel>
              <NumberInput
                name="handling"
                value={formik.values?.handling}
                onChange={(valueString, valueNumber) =>
                  formik.setFieldValue('handling', Number.isNaN(valueNumber) ? 0 : valueNumber)
                }
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              {formik.errors.handling && <FormErrorMessage>{formik.errors?.handling}</FormErrorMessage>}
            </FormControl>
            <FormControl id="acceleration" mb="4" isInvalid={!!formik.errors?.acceleration}>
              <FormLabel>Acceleration</FormLabel>
              <NumberInput
                name="acceleration"
                value={formik.values?.acceleration}
                onChange={(valueString, valueNumber) =>
                  formik.setFieldValue('acceleration', Number.isNaN(valueNumber) ? 0 : valueNumber)
                }
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              {formik.errors.acceleration && <FormErrorMessage>{formik.errors?.acceleration}</FormErrorMessage>}
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
    entity: 'bike',
    operation: AccessOperationEnum.UPDATE,
  }),
)(BikeEditPage);
