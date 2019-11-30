IFS="|"

cp style_template.css style.css
cp script_template.js script.js

while read placeholder value
do
  if [[ ( "$placeholder" =~ [^[:space:]] ) && ( "$value" =~ [^[:space:]] ) ]]
  then
    sed -i "s/$placeholder/$value/g" style.css
    sed -i "s/$placeholder/$value/g" script.js

  fi
done < $1

count1=$(eval grep "_placeholder" style.css | wc -l)
if [[ $count1 -gt 0 ]]
then
  echo "Warning: some placeholders in style_template.css could not be replaced."
fi

count2=$(eval grep "_placeholder" script.js | wc -l)
if [[ $count2 -gt 0 ]]
then
  echo "Warning: some placeholders in script_template.js could not be replaced."
fi
