export type AppointmentEntity = {
    id: number,
    date: string,
    time: string
    status: string,
    patientId: number,
    doctorId: number
}

export type FreeAppointment = {
    id: number,
    date: string,
    time: string,
    doctorName: string
}

export type AppointmentConsult = {
    id: number,
    date: string,
    time: string
    patientName?: string,
    doctorName?: string
}