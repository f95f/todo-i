interface IItem {
    id?: number | string,
    name: string,
    date: string | Date,
    isDone: boolean
}

export { IItem }