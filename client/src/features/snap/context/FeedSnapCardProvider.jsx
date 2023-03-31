import { useSelector } from 'react-redux';
import { SnapCardProvider } from './SnapCardProvider';
import { selectSnapById } from '../state';

// props => { id, children }
export const FeedSnapCardProvider = ({ id, children }) => {
  const snap = useSelector(selectSnapById(id));

  return <SnapCardProvider {...{ snap, children }} />;
};
