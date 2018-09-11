export class Facility {
  id: number;
  name: string;
  checked: boolean;

  constructor(id: number, name: string, checked?: boolean) {
    this.id = id;
    this.name = name;
    this.checked = checked ? checked : false;
  }
}
