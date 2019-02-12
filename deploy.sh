export WEBAPPBUCKET_NAME="";\
export FOTOBUCKET_NAME=""; \
export CODEBUCKET_NAME=""; \
export STACK_NAME=""; \
export IOT_ENDPOINT=""; \ # aws iot describe-endpoint
aws s3 mb "s3://$CODEBUCKET_NAME"; \
cd app/image-lambda && mvn clean install && cd .. && cd .. && \
lerna clean -y && lerna run clean && \
echo "WARNING: TODO SEPERATE LAMBDA AND FRONTEND"; \
lerna bootstrap && \
lerna run build && \
aws cloudformation package --template-file ./ci/stack.yml --s3-bucket "$CODEBUCKET_NAME" --output-template-file packaged.yaml && \
aws cloudformation deploy --template-file packaged.yaml --stack-name "$STACK_NAME" --parameter-overrides \
  "FotobucketName=$FOTOBUCKET_NAME"\
  "CodeBucketName=$CODEBUCKET_NAME"\
  "WebAppBucketName=$WEBAPPBUCKET_NAME"\
  "IotUrl=$IOT_ENDPOINT"\
  --capabilities CAPABILITY_IAM && \
echo "Building WebApp with generated Resources"; \
aws cloudformation describe-stacks > stack.json; \
export REACT_APP_FOTOBUCKET_NAME=`cat stack.json | jq --arg stack "$STACK_NAME" --raw-output '.Stacks[] | select(.StackName==$stack).Outputs[] | select(.OutputKey=="FotoBucketName").OutputValue'`; \
export REACT_APP_LOGIN_URL=`cat stack.json | jq --arg stack "$STACK_NAME" --raw-output '.Stacks[] | select(.StackName==$stack).Outputs[] | select(.OutputKey=="LoginApiDomain").OutputValue'`; \
export REACT_APP_USER_ACCESS=`cat stack.json | jq --arg stack "$STACK_NAME" --raw-output '.Stacks[] | select(.StackName==$stack).Outputs[] | select(.OutputKey=="UploadUserAccess").OutputValue'`; \
export REACT_APP_USER_SECRET=`cat stack.json | jq --arg stack "$STACK_NAME" --raw-output '.Stacks[] | select(.StackName==$stack).Outputs[] | select(.OutputKey=="UploadUserSecret").OutputValue'`; \
echo "BUCKET: $REACT_APP_FOTOBUCKET_NAME"; \
echo "LOGIN: $REACT_APP_LOGIN_URL"; \
echo "ACCESS: $REACT_APP_USER_ACCESS"; \
echo "SECRET: $REACT_APP_USER_SECRET"; \
echo "STAGE: $REACT_APP_STAGE"; \
echo "WARNING: TODO SEPERATE LAMBDA AND FRONTEND"; \
lerna clean -y && lerna run clean && \
lerna bootstrap && \
lerna run build && \
aws s3 sync ./app/webapp/build "s3://$WEBAPPBUCKET_NAME" --delete --acl public-read &&
aws s3 sync ./app/webapp-status/build "s3://$WEBAPPBUCKET_NAME/status" --delete --acl public-read &&
rm packaged.yaml; \
rm stack.json