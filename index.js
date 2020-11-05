import {Select} from './select/select';
import './select/styles.scss';

const SELECT_ITEMS = [
  {id: '1', value: 'React'},
  {id: '2', value: 'Angular'},
  {id: '3', value: 'Vue'},
  {id: '4', value: 'React Native'},
  {id: '5', value: 'Next'},
  {id: '6', value: 'Nest'},
];

const selectRootElement = document.querySelector('#select-root');

const select = new Select(selectRootElement, {
  placeholder: 'Выбирай давай давай',
  selectItems: SELECT_ITEMS,
  selectedId:'4',
  onSelect(item) {
    console.log('Selected Item: ', item)
  }
});

window.s = select;