export type FirebaseResponseSuccess = {
    success: true;
};
export type FirebaseResponseFailure = {
    success: false;
    message: string;
};

export type CreateResponse = (FirebaseResponseSuccess & { id: string }) | FirebaseResponseFailure;
export type DeleteResponse = CreateResponse;
export type EditResponse = CreateResponse;

export type GetResponse<T> = (FirebaseResponseSuccess & { data: T }) | FirebaseResponseFailure;
