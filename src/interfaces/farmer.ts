export interface farmerInterface {
  id?: string;
  firstname: string;
  lastname: string;
  country: string;
  district: string;
  phoneNo: string;
  password: string;
  profilePhoto: string;
  farmerGeneratedUniqueID: string;
  subscriptionType: "Basic" | "Premium";
  subscriptionStartDate: Date;
  subscriptionEndDate: Date;
}
