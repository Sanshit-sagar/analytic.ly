
import React from 'react'
import {Table} from './AriaTable'

import {
    Cell, 
    Column, 
    Row, 
    TableBody, 
    TableHeader
} from '@react-stately/table'


export const ExampleTable = (props: any) => {
   
    return (
        <Table aria-label="Table with selection" selectionMode="multiple">
            <TableHeader>
                <Column>Name</Column>
                <Column>Type</Column>
                <Column>Level</Column>
            </TableHeader>
            <TableBody>
                <Row key="1">
                <Cell>Charizard</Cell>
                <Cell>Fire, Flying</Cell>
                <Cell>67</Cell>
                </Row>
                <Row key="2">
                <Cell>Blastoise</Cell>
                <Cell>Water</Cell>
                <Cell>56</Cell>
                </Row>
                <Row key="3">
                <Cell>Venusaur</Cell>
                <Cell>Grass, Poison</Cell>
                <Cell>83</Cell>
                </Row>
                <Row key="4">
                    <Cell>Pikachu</Cell>
                    <Cell>Electric</Cell>
                    <Cell>100</Cell>
                </Row>
            </TableBody>
        </Table>
    )