import DatetimeCell from "./datetime";
import EnumCell from "./enum";
import ListCell from "./list";
import VectortCell from "./vector";
import Standard from './Standard'
export const ValueCellData: any = {
	...VectortCell,
	...EnumCell,
	...ListCell,
	...DatetimeCell,
	...Standard
}