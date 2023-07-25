import { CheckIcon } from '@assets/icons';
import { ReactComponent as EditIcon } from '@assets/icons/edit-pencil.svg';
import CustomTable, { ITableColumns } from '@components/ui/CustomTable';
import { Area, AreaChart, XAxis, YAxis } from 'recharts';
import useTimeseriesChart from '../hooks/useTimeseriesChart';

const COLUMNS: ITableColumns[] = [
  {
    header: 'INDICATOR',
    cell: (item) => <div className="w-[150px]">{item.name}</div>,
    sortWith: 'name',
  },
  {
    header: 'EDIT',
    cell: () => (
      <div className="flex w-[80px]">
        <div className="flex justify-center items-center w-8 h-8 rounded-full text-sm bg-[#E6FAFF]">
          <EditIcon width="16px" color="#1DC3CF" className="cursor-pointer" />
        </div>
      </div>
    ),
  },
  {
    header: 'CHART',
    cell: ({ data }) => {
      const dataToUse = data
        .map((item: any[]) => ({ date: item[0], value: item[1] }))
        .slice(0, 10);
      return (
        <AreaChart width={120} height={50} data={dataToUse}>
          <Area
            type="monotone"
            dataKey="value"
            stroke="#1DC3CF"
            fillOpacity={1}
            fill="url(#colorValue)"
          />
          <XAxis dataKey="date" hide />
          <YAxis hide />
        </AreaChart>
      );
    },
  },
  {
    header: 'VALUES',
    cell: ({ data }) => {
      const dataToUse = data.map((item: any[]) => item[1]);
      return (
        <div className="w-[120px]">
          {Math.min(...dataToUse).toFixed(1)} {} — {}
          {Math.max(...dataToUse).toFixed(1)}
        </div>
      );
    },
    sortWith: 'name',
  },
  {
    header: 'TIME INTERVAL',
    cell: (item) => {
      return (
        <div className="w-[120px]">
          <p className="text-sm">{item.timestamp}</p>
        </div>
      );
    },
  },
  {
    header: 'CHECK',
    cell: (item) => (
      <div className="cursor-pointer flex gap-2 justify-end">
        <div className="flex justify-center items-center w-8 h-8 rounded-full text-sm bg-[#E6FAFF]">
          <CheckIcon width="16px" color="#1DC3CF" className="cursor-pointer" />
        </div>
      </div>
    ),
  },
];

const EditDataTable = ({
  data,
  isPublished,
}: {
  data: any[];
  isPublished: any;
}) => {
  const { selectedChart, handleDeleteChart, timeseries, dataDetails } =
    useTimeseriesChart();
  return (
    <CustomTable
      data={data}
      columns={COLUMNS}
      // isLoading={isLoading}
    />
  );
};

export default EditDataTable;
