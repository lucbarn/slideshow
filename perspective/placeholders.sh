IFS="|"
while read placeholder value
do
  if [[ ( "$placeholder" =~ [^[:space:]] ) && ( "$value" =~ [^[:space:]] ) ]]
  then
    echo "$placeholder $value"
  fi
done < $1
