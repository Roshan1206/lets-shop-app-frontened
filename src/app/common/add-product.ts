export class AddProduct {
  constructor(
    public name: string,
    public description: string,
    public price: number,
    public stock: number,
    public brand: string,
    public category: number,
    public thumbnail: string
  ) {}
}
