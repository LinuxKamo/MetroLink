import { memo } from "react";

interface TableProp {
  heading: string;
  tableHeadings: string[];
  row: React.ReactNode[]; // must be <tr>[]
}

function Table({ row, heading, tableHeadings }: TableProp) {
  return (
    <div className="bg-white shadow-sm rounded-2xl p-6 border border-neutral-200/60">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-bold text-lg text-[#1e293b] tracking-tight">
          {heading}
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border-separate border-spacing-y-2">
          <thead className="bg-neutral-50/80 text-neutral-500 text-left">
            <tr>
              {tableHeadings.map((head, index) => (
                <th
                  key={index}
                  className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-wider first:rounded-l-xl last:rounded-r-xl"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {row && row.length > 0 ? (
              row
            ) : (
              <tr>
                <td
                  colSpan={tableHeadings.length}
                  className="text-neutral-600 text-center h-10"
                >
                  No records available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default memo(Table);
