import { TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useEffect } from "react";
import { useDebouncedValue } from "@mantine/hooks";
import classes from "./searchInput.module.css";

interface SearchInputInterface {
  placeholder?: string;
  setSearchData: (_value: string) => void;
  className?: string;
  setPage?: (_value: number) => void;
  value?: string; // Add value prop to receive initial/current value from parent
  radiusSize?: number;
  isDisabled?: boolean;
}

export function SearchInput({
  setSearchData,
  className,
  placeholder,
  value = "",
  radiusSize,
  isDisabled,
}: SearchInputInterface) {
  const [debouncedSearch] = useDebouncedValue(value, 1500);

  useEffect(() => {
    setSearchData(debouncedSearch);
  }, [debouncedSearch, setSearchData]);

  return (
    <>
      <TextInput
        className={className}
        w="100%"
        placeholder={`${placeholder ? placeholder : "Cari..."}`}
        leftSection={<IconSearch size={20} stroke={2} />}
        radius={radiusSize ?? "md"}
        size="xs"
        value={!isDisabled ? value : ""}
        onChange={(e) => setSearchData(e.currentTarget.value)}
        disabled={isDisabled}
        classNames={{
          input: classes.inputSearch,
        }}
      />
    </>
  );
}
