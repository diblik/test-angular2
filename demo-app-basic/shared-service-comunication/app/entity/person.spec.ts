import { Person } from './person';

describe('Person', () => {
  let person: Person = {_id: '1', firstname: 'Jan',lastname: "Novak", email: "novak@quick.cz", __v: 0, isSelected: false};
 
  it('has firstname', () => {
    expect(person.firstname).toEqual('Jan');
  });

  it('has id', () => {
    expect(person._id).toEqual('1');
  });
  
});