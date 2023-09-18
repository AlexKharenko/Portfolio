export interface TagInterface {
    id: string;
    tagName: string;
}

export interface TagCreateInterface extends Omit<TagInterface, "id"> {}
