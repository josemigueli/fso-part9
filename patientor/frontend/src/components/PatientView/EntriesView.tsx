import { Entry, Diagnosis } from '../../types';
import HospitalView from './HospitalView';
import HealthCheckView from './HealthCheckView';
import OccupationalHealthcareView from './OccupationalHealthcareView';
import { assertNever } from '../../utils';

interface EntriesViewProps {
  entry: Entry
  diagnoses: Diagnosis[]
}

const EntriesView = ({ entry, diagnoses }: EntriesViewProps) => {
  switch (entry.type) {
    case 'Hospital':
      return <HospitalView data={entry} diagnosis={diagnoses} />;
    case 'HealthCheck':
      return <HealthCheckView data={entry} diagnosis={diagnoses} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcareView data={entry} diagnoses={diagnoses} />;
    default:
      return assertNever(entry);
  }
};

export default EntriesView;
