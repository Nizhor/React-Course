import patientsDataset from '../../data/patients';
import { v1 as uuid } from 'uuid';
import { NoSsnPatient, Patient, NewPatient, EntryWithoutId, Entry } from '../types';

const fetchAllPatients = (): Patient[] => patientsDataset;

const fetchPatientsExcludingSSN = (): NoSsnPatient[] => patientsDataset.map(({ id, name, dateOfBirth, gender, occupation, entries }) => 
({ id, name, dateOfBirth, gender, occupation, entries }));

const findSinglePatientById = (id: string): Patient | undefined => patientsDataset.find(p => p.id === id);

const registerNewPatient = ( newPatientData: NewPatient ): Patient => {
    const newPatientEntry = {
        id: uuid(),
        ...newPatientData
    };
    patientsDataset.push(newPatientEntry);
    return newPatientEntry;
};

const insertEntryForPatient = ( existingPatient: Patient, entryData: EntryWithoutId ): Entry => {
    const entry = {
        id: uuid(),
        ...entryData
    };
    existingPatient.entries.push(entry);
    return entry;
};

export default {
    fetchAllPatients,
    fetchPatientsExcludingSSN,
    registerNewPatient,
    findSinglePatientById,
    insertEntryForPatient
};
