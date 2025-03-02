import { IItem } from "./item"

interface IList {
    id: string,
    name: string,
    createdAt: string | Date,
    updatedAt: string | Date,
    items: IItem[],
    size: number,
    completion: number,
}


export { IList }