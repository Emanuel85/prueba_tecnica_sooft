export interface Props {
    handleCard?: React.FormEventHandler<HTMLFormElement>;
    handleFocus?: () => void;
    handleBlur?: () => void;
    handleDelete?: (id: number) => void
    handleEdit?: (id: number) => void
}