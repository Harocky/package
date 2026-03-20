"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";

type Option = {
  label: string;
  value: string;
};

type DropdownProps = {
  open: boolean;
  options: Option[];
  selected: string | null;
  placeholder?: string;
  error?: string;
  onToggle: () => void;
  onClose: () => void;
  onSelect: (value: string) => void;
};

function EvTableDropdown({
  open,
  options,
  selected,
  placeholder = "Select",
  error,
  onToggle,
  onClose,
  onSelect,
}: DropdownProps) {
  const selectedItem = options.find((o) => o.value === selected);

  const longestText = useMemo(() => {
    const all = [placeholder, ...options.map((o) => o.label)];
    return all.reduce((a, b) => (a.length > b.length ? a : b));
  }, [options, placeholder]);

  return (
    <div className="relative flex flex-col ev-gap-xs flex-1">
      <button
        type="button"
        className={`w-full flex items-center justify-between bg-gray-50 border rounded-xl shadow-sm outline-none transition-all duration-200 ev-pad-x-md ev-pad-y-sm text-[15px] font-medium cursor-pointer ${
          error
            ? "border-red-500 bg-red-50 text-red-700"
            : "border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-100/50 focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
        }`}
        style={{ minWidth: `${longestText.length + 5}ch` }}
        onClick={onToggle}
      >
        <span className="truncate">
          {selectedItem ? selectedItem.label : placeholder}
        </span>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`text-gray-400 transition-transform duration-200 ${
            open ? "rotate-180 text-blue-500" : ""
          }`}
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={onClose} />

          <div
            className="ev-popover-animate absolute top-[calc(100%+8px)] left-0 z-50 bg-white border border-gray-100 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] flex flex-col ev-pad-xs overflow-y-auto"
            style={{
              minWidth: `${longestText.length + 6}ch`,
              maxHeight: "45vh",
            }}
          >
            {options.map((item) => {
              const isSelected = selected === item.value;
              return (
                <button
                  type="button"
                  key={item.value}
                  onClick={() => {
                    onSelect(item.value);
                    onClose();
                  }}
                  className={`w-full text-left rounded-lg cursor-pointer ev-pad-x-md ev-pad-y-sm transition-all duration-150 text-[14px] ${
                    isSelected
                      ? "bg-blue-50 text-blue-700 font-semibold"
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </>
      )}

      {error && (
        <span className="text-sm text-red-500 ml-1 font-medium">{error}</span>
      )}
    </div>
  );
}

export type EvTableColumn<T> = {
  key: keyof T;
  label: string;
  type?: "text" | "number" | "date";
};

export type EvTableFilter = {
  id: string;
  column: string;
  operator: "contains" | "equals" | "greater" | "less";
  value: string;
};

type EvTableProps<T> = {
  data: T[];
  columns: EvTableColumn<T>[];
};

export default function EvTable<T extends Record<string, unknown>>({
  data,
  columns,
}: EvTableProps<T>) {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T;
    direction: "asc" | "desc";
  } | null>(null);

  const [filters, setFilters] = useState<EvTableFilter[]>([]);
  const [colWidths, setColWidths] = useState<Record<string, number>>({});
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, string>>(
    {},
  );
  const [activeResizer, setActiveResizer] = useState<string | null>(null);

  const tableRef = useRef<HTMLTableElement>(null);
  const resizingCol = useRef<{
    key: string;
    startX: number;
    startWidth: number;
  } | null>(null);

  const handleSort = (key: keyof T) => {
    let direction: "asc" | "desc" = "asc";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const addFilter = () => {
    setFilters([
      ...filters,
      {
        id: Math.random().toString(36).substring(7),
        column: columns[0].key as string,
        operator: "contains",
        value: "",
      },
    ]);
  };

  const updateFilter = (
    id: string,
    field: keyof EvTableFilter,
    value: string,
  ) => {
    setFilters(
      filters.map((f) => (f.id === id ? { ...f, [field]: value } : f)),
    );
  };

  const removeFilter = (id: string) => {
    setFilters(filters.filter((f) => f.id !== id));
  };

  const toggleDropdown = (filterId: string, type: "column" | "operator") => {
    const key = `${filterId}-${type}`;
    setOpenDropdowns((prev) => ({
      ...prev,
      [key]: prev[key] === "open" ? "closed" : "open",
    }));
  };

  const isDropdownOpen = (filterId: string, type: "column" | "operator") => {
    return openDropdowns[`${filterId}-${type}`] === "open";
  };

  const filteredAndSortedData = useMemo(() => {
    let processedData = [...data];

    if (filters.length > 0) {
      processedData = processedData.filter((row) => {
        return filters.every((filter) => {
          if (!filter.value) return true;
          const cellValue = row[filter.column as keyof T];
          if (cellValue == null) return false;

          const strValue = String(cellValue).toLowerCase();
          const filterValue = filter.value.toLowerCase();

          switch (filter.operator) {
            case "contains":
              return strValue.includes(filterValue);
            case "equals":
              return strValue === filterValue;
            case "greater":
              return Number(cellValue) > Number(filter.value);
            case "less":
              return Number(cellValue) < Number(filter.value);
            default:
              return true;
          }
        });
      });
    }

    if (sortConfig !== null) {
      processedData.sort((a, b) => {
        const aValue = a[sortConfig.key] as string | number;
        const bValue = b[sortConfig.key] as string | number;

        if (aValue < bValue) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    return processedData;
  }, [data, columns, sortConfig, filters]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (resizingCol.current) {
        const { key, startX, startWidth } = resizingCol.current;
        const diff = e.clientX - startX;
        setColWidths((prev) => ({
          ...prev,
          [key]: Math.max(80, startWidth + diff),
        }));
      }
    };

    const handleMouseUp = () => {
      resizingCol.current = null;
      setActiveResizer(null);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const handleColMouseDown = (e: React.MouseEvent, key: string) => {
    e.preventDefault();
    e.stopPropagation();

    const th = tableRef.current?.querySelector(`th[data-key="${key}"]`);
    const startWidth =
      colWidths[key] || (th ? th.getBoundingClientRect().width : 150);

    resizingCol.current = {
      key,
      startX: e.clientX,
      startWidth,
    };

    setActiveResizer(key);
  };

  const columnOptions = columns.map((c) => ({
    label: c.label,
    value: c.key as string,
  }));

  const operatorOptions = [
    { label: "Contains", value: "contains" },
    { label: "Equals", value: "equals" },
    { label: "Greater Than", value: "greater" },
    { label: "Less Than", value: "less" },
  ];

  return (
    <div className="w-full ev-bg-main rounded-2xl shadow-sm border border-gray-100 overflow-hidden ev-flex ev-flex-col">
      {activeResizer && (
        <div className="fixed inset-0 z-50 cursor-col-resize select-none" />
      )}

      <div className="ev-pad-md border-b border-gray-100 ev-bg-alt">
        <div className="ev-flex ev-items-center ev-justify-between ev-mar-b-sm">
          <h3 className="text-gray-900 font-bold text-lg">Dynamic Data Grid</h3>
          <button
            onClick={addFilter}
            className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 ev-pad-x-sm ev-pad-y-xs rounded-md text-sm font-bold transition-colors"
          >
            + Add Filter
          </button>
        </div>

        {filters.length > 0 && (
          <div className="ev-flex ev-flex-col ev-gap-xs ev-mar-t-sm z-30 relative">
            {filters.map((filter) => (
              <div
                key={filter.id}
                className="ev-flex ev-flex-wrap ev-items-center ev-gap-xs bg-white ev-pad-xs rounded-md border border-gray-200 w-fit"
              >
                <div className="w-48">
                  <EvTableDropdown
                    open={isDropdownOpen(filter.id, "column")}
                    options={columnOptions}
                    selected={filter.column}
                    onToggle={() => toggleDropdown(filter.id, "column")}
                    onClose={() =>
                      setOpenDropdowns((prev) => ({
                        ...prev,
                        [`${filter.id}-column`]: "closed",
                      }))
                    }
                    onSelect={(val) => updateFilter(filter.id, "column", val)}
                    placeholder="Select Column"
                  />
                </div>

                <div className="w-40 border-l border-gray-200 ev-pad-l-xs">
                  <EvTableDropdown
                    open={isDropdownOpen(filter.id, "operator")}
                    options={operatorOptions}
                    selected={filter.operator}
                    onToggle={() => toggleDropdown(filter.id, "operator")}
                    onClose={() =>
                      setOpenDropdowns((prev) => ({
                        ...prev,
                        [`${filter.id}-operator`]: "closed",
                      }))
                    }
                    onSelect={(val) => updateFilter(filter.id, "operator", val)}
                    placeholder="Operator"
                  />
                </div>

                <div className="ev-search-container border-l border-gray-200 ev-pad-l-xs flex-1">
                  <input
                    className="ev-input w-full bg-gray-50 border border-gray-200 rounded-xl shadow-sm outline-none transition-all duration-200 ev-pad-x-md ev-pad-y-sm text-[15px] font-medium text-gray-700 focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                    placeholder="Value..."
                    value={filter.value}
                    onChange={(e) =>
                      updateFilter(filter.id, "value", e.target.value)
                    }
                  />
                </div>

                <button
                  onClick={() => removeFilter(filter.id)}
                  className="text-gray-400 hover:text-red-500 ev-pad-x-xs transition-colors ev-mar-l-xs"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="w-full overflow-x-auto relative z-10">
        <table
          ref={tableRef}
          className="text-left border-collapse w-max min-w-full table-fixed"
        >
          <thead className="bg-gray-50/50 sticky top-0 z-20">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key as string}
                  data-key={col.key as string}
                  style={{
                    width: colWidths[col.key as string] || 150,
                  }}
                  className="ev-pad-md text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-r border-gray-200 last:border-r-0 select-none relative group"
                >
                  <div className="ev-flex ev-items-center ev-justify-between ev-gap-md pr-2">
                    <span className="truncate">{col.label}</span>
                    <button
                      onClick={() => handleSort(col.key)}
                      className="text-gray-400 hover:text-gray-900 ev-transition focus:outline-none flex-shrink-0"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={
                          sortConfig?.key === col.key
                            ? "text-indigo-600"
                            : "text-gray-300"
                        }
                      >
                        {sortConfig?.key === col.key &&
                        sortConfig.direction === "asc" ? (
                          <polyline points="18 15 12 9 6 15"></polyline>
                        ) : sortConfig?.key === col.key &&
                          sortConfig.direction === "desc" ? (
                          <polyline points="6 9 12 15 18 9"></polyline>
                        ) : (
                          <>
                            <polyline points="7 15 12 20 17 15"></polyline>
                            <polyline points="7 9 12 4 17 9"></polyline>
                          </>
                        )}
                      </svg>
                    </button>
                  </div>
                  <div
                    onMouseDown={(e) =>
                      handleColMouseDown(e, col.key as string)
                    }
                    className="absolute top-0 right-0 bottom-0 w-2 cursor-col-resize bg-transparent group-hover:bg-indigo-500/20 hover:!bg-indigo-500 z-30"
                    style={{ right: "-1px" }}
                  />
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white">
            {filteredAndSortedData.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                data-index={rowIndex}
                className="relative group border-b border-gray-50 hover:bg-gray-50/50 transition-colors h-12"
              >
                {columns.map((col) => (
                  <td
                    key={col.key as string}
                    className="ev-pad-md text-sm text-gray-700 border-r border-gray-100 last:border-r-0 relative overflow-hidden"
                  >
                    <div className="ev-flex ev-items-center w-full overflow-hidden truncate">
                      {row[col.key] as React.ReactNode}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
            {filteredAndSortedData.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length}
                  className="ev-pad-xl text-center text-gray-500 text-sm"
                >
                  No data found matching your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
