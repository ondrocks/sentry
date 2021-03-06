import React from 'react';

import UserAvatar from 'app/components/avatar/userAvatar';
import {AvatarUser as UserType} from 'app/types';
import {removeFilterMaskedEntries} from 'app/components/events/interfaces/utils';
import ContextBlock from 'app/components/events/contexts/contextBlockV2';
import ErrorBoundary from 'app/components/errorBoundary';
import KeyValueList from 'app/components/events/interfaces/keyValueList/keyValueList';
import {defined} from 'app/utils';

import getUserKnownData from './getUserKnownData';

type Props = {
  data: Data;
};

type Data = {
  data?: null | {[key: string]: string};
} & UserType;

const User = ({data}: Props) => {
  if (!defined(data)) {
    return null;
  }

  const getKeyValueData = (val: object) => {
    Object.keys(val).map(key => [key, val[key]]);
  };

  return (
    <div className="user-widget">
      <div className="pull-left">
        <UserAvatar user={removeFilterMaskedEntries(data)} size={48} gravatar={false} />
      </div>
      <ContextBlock knownData={getUserKnownData(data)} />
      {defined(data?.data) && (
        <ErrorBoundary mini>
          <KeyValueList data={getKeyValueData(data.data)} isContextData />
        </ErrorBoundary>
      )}
    </div>
  );
};

User.getTitle = () => 'User';

export default User;
