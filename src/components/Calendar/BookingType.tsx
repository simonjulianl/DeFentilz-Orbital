export interface Booking {
    id?: number,
    startingTime: string
    endingTime: string,
    facilityId: number, 
    userEmail: string,
    title?: string
}

export enum ModalState {
    None,
    Submit,
    Delete
  }