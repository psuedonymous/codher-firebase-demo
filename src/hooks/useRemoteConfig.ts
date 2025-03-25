import { useEffect, useState } from "react";
import {
  getRemoteConfig,
  fetchAndActivate,
  getValue,
} from "firebase/remote-config";
import { firebaseApp } from "../config/firebase";

export const useFeatureFlag = (key: string): boolean => {
  const [featureEnabled, setFeatureEnabled] = useState(false);
  const remoteConfig = getRemoteConfig(firebaseApp);
  remoteConfig.settings.minimumFetchIntervalMillis = 3000;

  useEffect(() => {
    fetchAndActivate(remoteConfig).then(() => {
      setFeatureEnabled(getValue(remoteConfig, key).asBoolean());
    });
  }, [key]);

  return featureEnabled;
};
