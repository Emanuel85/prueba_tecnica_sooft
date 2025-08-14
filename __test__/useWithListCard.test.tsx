import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import useWithListCard from '../src/Container/components/useWithListCard';
import * as Store from '../src/store/useStore';

jest.mock('../src/store/useStore', () => ({ useStore: jest.fn() }));

const useStoreMock = Store as jest.Mocked<typeof Store>;

const Dummy: React.FC<any> = ({ handleCard, handleDelete, handleEdit, handleFocus, handleBlur }) => (
  <div>
    <form data-testid="form" onSubmit={handleCard} />
    <button data-testid="delete" onClick={() => handleDelete?.(2)}>del</button>
    <button data-testid="edit" onClick={() => handleEdit?.(2)}>edit</button>
    <input data-testid="focusable" onFocus={handleFocus} onBlur={handleBlur} />
  </div>
);

const WrappedDummy = useWithListCard(Dummy);

describe('useWithListCard HOC - acciones', () => {
  beforeEach(() => {
    useStoreMock.useStore.mockReset();
  });

  it('CREAR: agrega una card cuando no hay editingId', () => {
    const setCards = jest.fn();
    const setFields = jest.fn();

    useStoreMock.useStore.mockReturnValue({
      cards: [],
      fields: { title: 'Nueva', description: 'Desc' },
      searchText: '',
      editingId: null,
      setCards,
      setFields,
      setFilteredCards: jest.fn(),
      setEditingId: jest.fn(),
      setIsFocused: jest.fn(),
    } as any);

    render(<WrappedDummy />);
    fireEvent.submit(screen.getByTestId('form'));

    expect(setCards).toHaveBeenCalledTimes(1);
    const arg = setCards.mock.calls[0][0] as any[];
    expect(arg.length).toBe(1);
    expect(arg[0]).toEqual(expect.objectContaining({
      title: 'Nueva',
      description: 'Desc',
      id: expect.any(Number),
    }));

    expect(setFields).toHaveBeenCalledWith('title', '');
    expect(setFields).toHaveBeenCalledWith('description', '');
  });

  it('EDITAR: actualiza una card cuando hay editingId', () => {
    const setCards = jest.fn();
    const setFields = jest.fn();
    const setEditingId = jest.fn();

    useStoreMock.useStore.mockReturnValue({
      cards: [
        { id: 2, title: 'Viejo', description: 'Antiguo' },
        { id: 3, title: 'Otro', description: 'Otro' },
      ],
      fields: { title: 'Editado', description: 'Nuevo' },
      searchText: '',
      editingId: 2,
      setCards,
      setFields,
      setFilteredCards: jest.fn(),
      setEditingId,
      setIsFocused: jest.fn(),
    } as any);

    render(<WrappedDummy />);
    fireEvent.submit(screen.getByTestId('form'));

    expect(setCards).toHaveBeenCalledTimes(1);
    const updated = setCards.mock.calls[0][0] as any[];
    expect(updated).toEqual([
      { id: 2, title: 'Editado', description: 'Nuevo' },
      { id: 3, title: 'Otro', description: 'Otro' },
    ]);
    expect(setEditingId).toHaveBeenCalledWith(null);
    expect(setFields).toHaveBeenCalledWith('title', '');
    expect(setFields).toHaveBeenCalledWith('description', '');
  });

  it('ELIMINAR: quita una card por id y cancela edición si corresponde', () => {
    const setCards = jest.fn();
    const setFields = jest.fn();
    const setEditingId = jest.fn();

    useStoreMock.useStore.mockReturnValue({
      cards: [
        { id: 1, title: 'A', description: 'A' },
        { id: 2, title: 'B', description: 'B' },
      ],
      fields: { title: 'X', description: 'Y' },
      searchText: '',
      editingId: 2,
      setCards,
      setFields,
      setFilteredCards: jest.fn(),
      setEditingId,
      setIsFocused: jest.fn(),
    } as any);

    render(<WrappedDummy />);
    fireEvent.click(screen.getByTestId('delete'));

    expect(setCards).toHaveBeenCalledTimes(1);
    const remaining = setCards.mock.calls[0][0] as any[];
    expect(remaining).toEqual([{ id: 1, title: 'A', description: 'A' }]);

    expect(setEditingId).toHaveBeenCalledWith(null);
    expect(setFields).toHaveBeenCalledWith('title', '');
    expect(setFields).toHaveBeenCalledWith('description', '');
  });
});
