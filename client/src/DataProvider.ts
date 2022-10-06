/****************************************/
/*********     Posts        *************/
/****************************************/

export interface IBase {
  _id: string;
  date: string;
 
}

export interface ThumbnailProps extends IBase {
  thumbnail: string;
}

export interface UserPostListProps extends IBase {
  original_image: string;
}
