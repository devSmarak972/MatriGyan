import React, { useState } from "react";
import Doubt from "./Doubt";
import { Select } from "@mantine/core";
import data from "./data/questions.json";

const Doubts = (props) => {
	const [sortBy, setSortBy] = useState("");
	data=props.comments?props.comments.map(comment=>{
		// {
		//   "name": "Amiray Guichon",
		//   "video": 12,
		//   "course": "Ketones",
		//   "question": "Why are ketones more electrophilic than esters even though 'O' atom is more electronegative?",
		//   "date": "2020-01-27",
		//   "replies": 6,
		//   "upvotes": 12
		// },
		var date=new Date(comment.date_time)
		return {
			"name":comment.user.full_name,
			"video":comment.video,
			"course":props.course?.find(el=>el.id===comment.course).title,
			"question":comment.comment,
			"date":date.getFullYear()+"-"+date.getMonth()+"-"+date.getDate(),
			"replies":comment.totalcomments,
			"upvotes":comment.likes
		}
	}):data;
	if (sortBy === "" || sortBy === "Date") {
		data.sort((a, b) => {
			let dateA = new Date(a.date);
			let dateB = new Date(b.date);
			return dateB - dateA;
		});
	} else if (sortBy === "Upvotes") {
		data.sort((a, b) => b.upvotes - a.upvotes);
	}
	data = data.slice(0, Math.min(5, data.length));
	console.log(data);
	return (
		<div className="col-span-12 lg:col-span-4">
			<div className="flex items-center justify-between mb-6">
				<h2 className="text-lg font-bold tracking-wide text-slate-700 dark:text-navy-100">
					Doubts on Lectures
				</h2>
				<Select
					placeholder="Sort By"
					data={["Date", "Upvotes"]}
					value={sortBy}
					onChange={setSortBy}
					className="w-40"
				/>
			</div>
			<div
				className="reviewSection scrollbar"
				style={{ maxHeight: "600px", overflowY: "scroll" }}
			>
				{data.map((e) => (
					<Doubt
						name={e.name}
						video={e.video}
						course={e.course}
						question={e.question}
						date={e.date}
						replies={e.replies}
						upvotes={e.upvotes}
					/>
				))}
			</div>
		</div>
	);
};

export default Doubts;
