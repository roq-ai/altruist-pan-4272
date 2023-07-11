import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface TrackInterface {
  id?: string;
  name: string;
  difficulty_level: number;
  terrain: string;
  obstacles: string;
  organization_id?: string;
  created_at?: any;
  updated_at?: any;

  organization?: OrganizationInterface;
  _count?: {};
}

export interface TrackGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  terrain?: string;
  obstacles?: string;
  organization_id?: string;
}
