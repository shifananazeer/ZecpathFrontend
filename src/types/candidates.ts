export interface Employer {
  id: number;
  company_name: string;
  location: string;
  sector: string;
  services: string;
  size: number;
  website: string;
  is_verified_company: boolean;
}

export interface EmployerResponse {
  links: {
    next: string | null;
    previous: string | null;
  };
  results: Employer[];
}

