#!/bin/bash

touch ../merged.md
touch ../toc.md

echo "# Appollon
![](images/AppollonLogo.svg)  
_Appollon Logo, created by Tim_
## Table of Contents" >> ../toc.md

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
		echo "- [$l](#$l)" >> ../toc.md

		if [[ $(head $p -n1) != "# $l" ]]; then
			cat <(echo "# $l") $p > new_$l.md
			mv new_$l.md $p
		fi

		echo >> ../merged.md

		if [[ $l == "home" ]]; then
			echo "# home" >> ../merged.md
			tail -n +6 $p >> ../merged.md
		else
			cat $p >> ../merged.md
		fi
	fi
done

cat <(cat ../toc.md) ../merged.md > ../new_merged.md
mv ../new_merged.md ../merged.md
rm ../toc.md
