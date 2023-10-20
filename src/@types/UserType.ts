type UserProps = {
  id: number;
  name: string;
  email: string;
  password: string;
  is_admin: boolean;
  created_at: Date;
};

type UserPrivateInfo = {
  cpf: string;
  ethnicity: string;
  birth: string;
  occupation?: string;
  gender: string;
  marital_status: string;
  nationality: string;
  state_nationality: string;
  father_name: string;
  mother_name: string;
  source: string;
  city_born: string;
};

type UserContactInfo = {
  phone: string;
  cep: string;
  state: string;
  address: string;
  house_number: string;
  city: string;
  neighborhood: string;
  education: string;
  institution_name: string;
  institution_type: string;
  year_graduation: string;
};

export { UserProps, UserPrivateInfo, UserContactInfo };
