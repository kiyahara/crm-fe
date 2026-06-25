import { TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useDebouncedValue } from "@mantine/hooks";
import classes from "./searchInput.module.css";

interface SearchInputInterface {
  placeholder?: string;
  setSearchData: (_value: string) => void;
  className?: string;
  setPage?: (_value: number) => void;
  value?: string;
  radiusSize?: number;
  isDisabled?: boolean;
}

export function SearchInput({
  setSearchData,
  className,
  placeholder,
  radiusSize,
  isDisabled,
}: SearchInputInterface) {
  const [search, setSearch] = useState("");

  const [debouncedSearch] = useDebouncedValue(search, 500);

  useEffect(() => {
    setSearchData(debouncedSearch);
  }, [debouncedSearch, setSearchData]);

  return (
    <TextInput
      className={className}
      w="100%"
      placeholder={placeholder ?? "Cari..."}
      leftSection={<IconSearch size={20} stroke={2} />}
      radius={radiusSize ?? "md"}
      size="xs"
      value={search}
      onChange={(e) => setSearch(e.currentTarget.value)}
      disabled={isDisabled}
      classNames={{
        input: classes.inputSearch,
      }}
    />
  );
}
