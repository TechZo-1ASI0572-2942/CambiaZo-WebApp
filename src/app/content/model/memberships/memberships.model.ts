export class Memberships {
  name: string;
  price: number;
  description: string;
  benefits: any[];
  id: string;

  constructor(name: string, price: number, description: string, benefits: any[], id: string) {
    this.name = name;
    this.price = price;
    this.description = description;
    this.benefits = benefits;
    this.id=id;
  }
}
