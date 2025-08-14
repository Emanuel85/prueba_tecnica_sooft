export interface Props {
    handleCard?: (e: React.FormEvent<HTMLFormElement>) => void;
    handleFocus?: () => void;
    handleBlur?: () => void;
}