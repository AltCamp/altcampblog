import React from "react";
interface Row {
  _key: string;
  _type: "tableRow";
  cells: string[];
}

type Props = {
  isInline?: boolean;
  index?: number;
  value: {
    rows: Row[];
    _key: string;
    _type: "table";
  };
};

export function TableBlock({ value }: Props) {
  let { rows } = value;
  let head = rows[0];
  let body = rows.slice(1);
  return (
    <div className="overflow-x-auto w-full">
      <table
        className="table-auto text-left my-6 w-full transition-all duration-300 overflow-x-scroll rounded-md p-4 border-spacing-2 bg-gray-500"
      >
        <thead>
          <tr>
            {head?.cells.map((cell) => (
              <th
                key={cell}
                className="p-4 font-bold cursor-pointer text-white bg-gray-900 dark:text-gray-900 dark:bg-white min-w-[200px]"
              >
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="  bg-[#f056c705] bg-gradient-to-r border-gray-400">
          {body?.map((row) => (
            <tr key={row._key}>
              {row.cells.map((cell) => (
                <td key={cell} 
                className="p-4 font-bold cursor-pointer text-gray-200 bg-gray-600 dark:text-gray-600 dark:bg-gray-200 min-w-[200px]"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
