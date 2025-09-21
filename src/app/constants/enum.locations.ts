export enum LocationName {
  BANANI = "Banani",
  GULSHAN = "Gulshan",
  MIRPUR = "Mirpur",
  UTTARA = "Uttara",
  DHANMONDI = "Dhanmondi",
  MOTIJHEEL = "Motijheel",
  FARMGATE = "Farmgate",
  MOHAKHALI = "Mohakhali",
  BASHUNDHARA = "Bashundhara",
  SHAHBAGH = "Shahbagh",
}

export type LocationNameType = (typeof LocationName)[keyof typeof LocationName];
