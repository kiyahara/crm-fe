import { HeaderInterface } from "@/types";
import { ScrollArea, Table, Text } from "@mantine/core";

interface tableWithoutHeaderInterface {
  header: HeaderInterface[];
  headerColor?: string;
  isWithTableBorder?: boolean;
  isWithColumnBorder?: boolean;
  isWithRowBorder?: boolean;
  isHightlightOnOver?: boolean;
  isStickyHead?: boolean;
  isTransparent?: boolean;
  children: React.ReactNode;
  isCollapse?: boolean;
  id?: string;
}

export function TableComponent({
  header,
  headerColor = "linear-gradient(135deg, #3b82f6, #1d4ed8)",
  isWithTableBorder,
  isWithColumnBorder,
  isWithRowBorder = true,
  isHightlightOnOver = true,
  isStickyHead,
  isTransparent,
  children,
  isCollapse = true,
  id,
}: tableWithoutHeaderInterface) {
  const TableContent = (
    <Table
      id={id}
      w="100%"
      withTableBorder={isWithTableBorder ?? false}
      highlightOnHover={isHightlightOnOver}
      withColumnBorders={isWithColumnBorder ?? false}
      withRowBorders={isWithRowBorder}
      stickyHeader={isStickyHead}
      styles={{
        td: {
          height: "28px",
          padding: "6px",
          fontSize: "11px",
          whiteSpace: "nowrap",
          borderColor: isTransparent ? "transparent" : "rgba(255,255,255,0.08)",
        },

        tr: {
          transition: "all 0.15s ease",
          borderBottom: isTransparent
            ? "none"
            : "1px solid rgba(255,255,255,0.08)",
        },

        table: {
          borderCollapse: isCollapse ? "collapse" : "initial",
          borderColor: isTransparent ? "transparent" : "rgba(255,255,255,0.1)",
        },
      }}
    >
      {/* HEADER */}
      <Table.Thead>
        <Table.Tr
          style={{
            background: headerColor,
            boxShadow: "0 2px 10px rgba(59, 130, 246, 0.25)",
          }}
        >
          {header.map((data: HeaderInterface, index: number) => (
            <Table.Th
              key={index}
              ta={data.align}
              colSpan={data.colSpan || 1}
              px={10}
              py={10}
              w={data.sizeWidth}
              style={{
                height: "42px",
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
                backdropFilter: "blur(6px)",
                WebkitBackdropFilter: "blur(6px)",
                border: "3px solid rgba(255,255,255,0.15)",
              }}
            >
              <Text
                size="xs"
                fw={600}
                c="white"
                style={{
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                  opacity: 0.95,
                }}
              >
                {data.title}
              </Text>
            </Table.Th>
          ))}
        </Table.Tr>
      </Table.Thead>

      {/* BODY */}
      <Table.Tbody>{children}</Table.Tbody>
    </Table>
  );

  return (
    <ScrollArea w="100%" type="auto">
      {TableContent}
    </ScrollArea>
  );
}
