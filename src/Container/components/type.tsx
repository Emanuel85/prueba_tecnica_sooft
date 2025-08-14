export interface Props {
    handleCard?: (e: React.FormEvent<HTMLFormElement>) => void;
    handleFocus?: () => void;
    handleBlur?: () => void;
    handleDelete?: (id: number) => void
    handleEdit?: (id: number) => void
}