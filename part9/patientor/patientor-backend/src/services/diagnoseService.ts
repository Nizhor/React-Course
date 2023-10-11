import diagnosesDataset from '../../data/diagnoses';
import { Diagnose } from '../types';

const retrieveDiagnoses = (): Diagnose[] => diagnosesDataset;

export default {
    retrieveDiagnoses
};
