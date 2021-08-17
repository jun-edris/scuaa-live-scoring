import { useState } from 'react';
import {
	Paper,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
} from '@material-ui/core';
import TableHeader from './TableHeader';
import useTable from './../hooks/useTable';

const headCells = [
	{ id: 'teams', label: 'Teams Competing' },
	{ id: 'sport', label: 'Sports Event' },
];
const LiveTable = () => {
	const [records, setRecords] = useState();

	const { TblContainer, TblHead } = useTable(records, headCells);
	return (
		<>
			<TblContainer>
				<TblHead />
				<TableBody>
					<TableRow>
						<TableCell>Hello</TableCell>
						<TableCell>Hello</TableCell>
					</TableRow>
				</TableBody>
			</TblContainer>
		</>
	);
};

export default LiveTable;
