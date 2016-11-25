interface Selectable {
	isSelected: Boolean;
}

export class Person implements Selectable {
  	_id: string;
  	firstname: string;
	lastname: string;
	email: string;
	__v: number;
	isSelected: Boolean;
}