
import React from 'react'
import {Table} from './AriaTable'

import {
    Cell, 
    Column, 
    Row, 
    TableBody, 
    TableHeader
} from '@react-stately/table'




let columns = [
    {name: 'Name', uid: 'name'},
    {name: 'Type', uid: 'type'},
    {name: 'Level', uid: 'level'}
  ];
  
  let rows = [
    {id: 1, name: 'Charizard', type: 'Fire, Flying', level: '67'},
    {id: 2, name: 'Blastoise', type: 'Water', level: '56'},
    {id: 3, name: 'Venusaur', type: 'Grass, Poison', level: '83'},
    {id: 4, name: 'Pikachu', type: 'Electric', level: '100'},
    {id: 5, name: 'Charizard', type: 'Fire, Flying', level: '67'},
    {id: 6, name: 'Blastoise', type: 'Water', level: '56'},
    {id: 7, name: 'Venusaur', type: 'Grass, Poison', level: '83'},
    {id: 8, name: 'Pikachu', type: 'Electric', level: '100'},
    {id: 9, name: 'Charizard', type: 'Fire, Flying', level: '67'},
    {id: 10, name: 'Blastoise', type: 'Water', level: '56'},
    {id: 11, name: 'Venusaur', type: 'Grass, Poison', level: '83'},
    {id: 12, name: 'Pikachu', type: 'Electric', level: '100'}
  ];
  