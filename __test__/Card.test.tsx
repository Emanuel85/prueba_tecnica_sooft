import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Card from '../src/Container/components/Card';
import * as Store from '../src/store/useStore';

jest.mock('next/image', () => (props: any) => <img {...props} alt={props.alt || ''} />);
jest.mock('../src/store/useStore', () => ({ useStore: jest.fn() }));

const useStoreMock = Store as jest.Mocked<typeof Store>;

describe('Card component', () => {
  const mockItem = { id: 1, title: 'Test Title', description: 'Test Description' };

  beforeEach(() => {
    useStoreMock.useStore.mockReset();
  });

  it('renderiza títulos, descripciones y botones', () => {
    useStoreMock.useStore.mockReturnValue({
      filteredCards: [mockItem],
      editingId: null,
    } as any);

    const onDelete = jest.fn();
    const onEdit = jest.fn();

    render(<Card handleDelete={onDelete} handleEdit={onEdit} />);

    expect(screen.getByTestId('info_title')).toHaveTextContent('Test Title');
    expect(screen.getByTestId('details_description')).toHaveTextContent('Test Description');
    expect(screen.getByTestId('edit_button1')).toBeInTheDocument();
    expect(screen.getByTestId('delete_button1')).toBeInTheDocument();
    expect(screen.getByTestId('test-image')).toBeInTheDocument();
  });

  it('dispara handleEdit y handleDelete con el id correcto', () => {
    useStoreMock.useStore.mockReturnValue({
      filteredCards: [mockItem],
      editingId: null,
    } as any);

    const onDelete = jest.fn();
    const onEdit = jest.fn();

    render(<Card handleDelete={onDelete} handleEdit={onEdit} />);

    fireEvent.click(screen.getByTestId('edit_button1'));
    fireEvent.click(screen.getByTestId('delete_button1'));

    expect(onEdit).toHaveBeenCalledWith(1);
    expect(onDelete).toHaveBeenCalledWith(1);
  });

  it('aplica clase de edición cuando editingId coincide', () => {
    useStoreMock.useStore.mockReturnValue({
      filteredCards: [mockItem],
      editingId: 1,
    } as any);

    render(<Card />);

    const container = screen.getByTestId('container_card1');
    expect(container.className).toMatch(/editing_card/);
  });
});
