// @flow
import axios from 'axios'
import Config from './AWS'

type Response = {
  url: string;
}

export const fetchUrl = async (): Promise<String> => {
  const {data}: Response = await axios.get("https://" + Config.LOGIN_URL);
  return data.body.url; //removeURLParam(data.body.url, "X-Amz-Security-Token");
};


function removeURLParam(url, param) {
  var urlparts = url.split('?');
  if (urlparts.length >= 2) {
    var prefix = encodeURIComponent(param) + '=';
    var pars = urlparts[1].split(/[&;]/g);
    for (var i = pars.length; i-- > 0;)
      if (pars[i].indexOf(prefix, 0) === 0)
        pars.splice(i, 1);
    if (pars.length > 0)
      return urlparts[0] + '?' + pars.join('&');
    else
      return urlparts[0];
  }
  else
    return url;
}