// Add your models here if you have any
export interface Order {
    orderId: string
    name: string
    email: string
    size: number
    thickCrust: number
    sauce: string
    toppings: string[]
    comments: string
}