IFS="|"

cp style_template.less style.less
cp script_template.js script.js

while read placeholder value
do
  if [[ ( "$placeholder" =~ [^[:space:]] ) && ( "$value" =~ [^[:space:]] ) ]]
  then
    sed -i "s/$placeholder/$value/g" style.less
    sed -i "s/$placeholder/$value/g" script.js

  fi
done < $1

count1=$(eval grep "@[a-zA-Z0-9]+Placeholder" style.less | wc -l)
if [[ $count1 -gt 0 ]]
then
  echo "Warning: some placeholders in style_template.less could not be replaced."
fi

count2=$(eval grep "@[a-zA-Z0-9]+Placeholder" script.js | wc -l)
if [[ $count2 -gt 0 ]]
then
  echo "Warning: some placeholders in script_template.js could not be replaced."
fi
