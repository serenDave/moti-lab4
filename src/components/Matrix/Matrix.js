import React from 'react'
import Table from 'react-bootstrap/Table';

const Matrix = (props) => {
    return (
        <Table stripped bordered>
            <thead>
            <tr>
                <th>Ви \ Опонент</th>
                <th>Показати 1 палець і <br/>назвати цифру 1</th>
                <th>Показати 1 палець і<br/>назвати цифру 2</th>
                <th>Показати 2 пальці і<br/>назвати цифру 2</th>
                <th>Показати 2 пальці і <br/>назвати цифру 2 </th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td id="strategy-1">Показати 1 палець і <br/>назвати цифру 1</td>
                <td id="11"></td>
                <td id="12"></td>
                <td id="13"></td>
                <td id="14"></td>
            </tr>
            <tr>
                <td id="strategy-2">Показати 1 палець і<br/>назвати цифру 2</td>
                <td id="21"></td>
                <td id="22"></td>
                <td id="23"></td>
                <td id="24"></td>
            </tr>
            <tr>
                <td id="strategy-3">Показати 2 пальці і<br/>назвати цифру 1</td>
                <td id="31"></td>
                <td id="32"></td>
                <td id="33"></td>
                <td id="34"></td>
            </tr>
            <tr>
                <td id="strategy-4">Показати 2 пальці і<br/>назвати цифру 2</td>
                <td id="41"></td>
                <td id="42"></td>
                <td id="43"></td>
                <td id="44"></td>
            </tr>
            </tbody>
    </Table>
    )
}

export default Matrix
