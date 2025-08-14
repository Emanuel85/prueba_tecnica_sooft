import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchBox from '../src/Container/components/SearchBox';
import * as Store from '../src/store/useStore';

jest.mock('next/image', () => (props: any) => <img {...props} alt={props.alt || ''} />);
jest.mock('../src/store/useStore', () => ({ useStore: jest.fn() }));

const useStoreMock = Store as jest.Mocked<typeof Store>;

describe('SearchBox component', () => {
  beforeEach(() => {
    useStoreMock.useStore.mockReset();
  });

  it('actualiza texto de búsqueda via setSearchText', () => {
    const setSearchText = jest.fn();
    useStoreMock.useStore.mockReturnValue({
      searchText: '',
      setSearchText,
    } as any);

    render(<SearchBox />);

    const input = screen.getByTestId('title-input') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'hola' } });

    expect(setSearchText).toHaveBeenCalledWith('hola');
  });

  it('llama handleFocus y handleBlur al enfocar/salir', () => {
    useStoreMock.useStore.mockReturnValue({
      searchText: '',
      setSearchText: jest.fn(),
    } as any);

    const handleFocus = jest.fn();
    const handleBlur = jest.fn();

    render(<SearchBox handleFocus={handleFocus} handleBlur={handleBlur} />);

    const input = screen.getByTestId('title-input');
    fireEvent.focus(input);
    fireEvent.blur(input);

    expect(handleFocus).toHaveBeenCalledTimes(1);
    expect(handleBlur).toHaveBeenCalledTimes(1);
  });

  it('envía el formulario y llama handleCard', () => {
    useStoreMock.useStore.mockReturnValue({
      searchText: 'abc',
      setSearchText: jest.fn(),
    } as any);

    const handleCard = jest.fn((e: any) => e.preventDefault());

    render(<SearchBox handleCard={handleCard} />);

    fireEvent.click(screen.getByTestId('search-button'));

    expect(handleCard).toHaveBeenCalled();
  });
});
