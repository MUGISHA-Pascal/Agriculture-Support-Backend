export interface CropInterface {
  id?: string;
  cropName: string;
  harvestSeason: string;
  qtyPerSeason: number;
  pricePerKg: number;
  verified?: boolean;
}
