#!/bin/bash

touch output/merged.md
touch output/toc.md

echo "# Appollon
![](images/AppollonLogo.svg)  
_Appollon Logo, created by Tim_
## Table of Contents" >> output/toc.md

cat _Sidebar.md | while read l; do
	if [[ ${l:0:3} != "###" ]]; then
		continue
	fi

	n=${l#*[}
	n=${n%]*}
	l=${l#*(}
	l=${l%)*}

	p="./$l.md"

	if test -f $p; then
		echo "- [$l](#$l)" >> output/toc.md

		if [[ $(head $p -n1) != "# $l" ]]; then
			cat <(echo "# $l") $p > new_$l.md
			mv new_$l.md $p
		fi

		echo >> output/merged.md

		if [[ $l == "home" ]]; then
			echo "# home" >> output/merged.md
			tail -n +6 $p >> output/merged.md
		else
			cat $p >> output/merged.md
		fi
	fi
done

cat <(cat output/toc.md) output/merged.md > output/new_merged.md
mv output/new_merged.md output/merged.md
rm output/toc.md
