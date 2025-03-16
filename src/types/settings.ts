export interface ISiteBanner {
  id: number;
  title: string;
  image: string;
  link?: string | undefined;
  description: string;
  active: boolean;
}

export interface ISiteBannerCreate extends Omit<ISiteBanner, 'id' | 'image'> {
  image: File;
}

export type ISiteBannerUpdate = Partial<ISiteBannerCreate>;
